import {
	LinkAuthenticationElement,
	PaymentElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import socketIO from "socket.io-client";
import { useCreateOrderMutation } from "@/redux/features/orders/ordersApi";
import { Button } from "@nextui-org/button";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type CheckOutFormProps = {
	setOpen: any;
	data: any;
	user: any;
	refetch: any;
};

const CheckOutForm = ({ data, user, refetch }: CheckOutFormProps) => {
	const stripe = useStripe();

	const elements = useElements();

	const [message, setMessage] = useState<any>("");

	const [createOrder, { data: orderData, error }] = useCreateOrderMutation();

	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if (!stripe || !elements) {
			return;
		}

		setIsLoading(true);
		const { error, paymentIntent } = await stripe.confirmPayment({
			elements,
			redirect: "if_required",
		});

		if (error) {
			setMessage(error.message);
			setIsLoading(false);
		} else if (paymentIntent && paymentIntent.status === "succeeded") {
			setIsLoading(false);
			createOrder({ courseId: data._id, payment_info: paymentIntent });
		}
	};

	useEffect(() => {
		if (orderData) {
			refetch();
			socketId.emit("notification", {
				title: "New Order",
				message: `You have a new order from ${data.name}`,
				userId: user._id,
			});

			redirect(`/course-access/${data._id}`);
		}

		if (error && "data" in error) {
			const errorMessage = error as any;
			toast.error(errorMessage.data.message);
		}
	}, [orderData, error, refetch, data.name, data._id, user._id]);

	return (
		<form id='payment-form' onSubmit={handleSubmit}>
		  <LinkAuthenticationElement 
			id='link-authentication-element'
			options={{
			  defaultValues: {
				email: user?.email || '',
			  }
			}}
		  />
		  <PaymentElement 
			id='payment-element'
			options={{
			  fields: {
				billingDetails: {
				  name: 'auto',
				  email: 'auto',
				}
			  },
			  layout: {
				type: 'tabs',
				defaultCollapsed: false,
				radios: false,
				spacedAccordionItems: false
			  }
			}}
		  />
		  <button disabled={isLoading || !stripe || !elements} id='submit'>
			<span id='button-text' className={` mt-2 !h-[35px]`}>
			  {isLoading ? "Đang xử lý..." : "Thanh toán ngay"}
			</span>
		  </button>
		  {message && (
			<div id='payment-message' className='text-[red] font-Poppins pt-2'>
			  {message}
			</div>
		  )}
		</form>
	);
};

export default CheckOutForm;
