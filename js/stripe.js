const stripe = Stripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const clientSecret =
  "pi_1Gt0RE2eZvKYlo2CL6a7GQa5_secret_nrMAwgH8OQgguiayP05ywbrc4";

const appearance = {
  theme: "flat",
  variables: { colorPrimaryText: "#262626" },
};
const options = { mode: "billing" };
const elements = stripe.elements({ clientSecret });
const addressElement = elements.create("address", options);
const paymentElement = elements.create("payment");
addressElement.mount("#address-element");
paymentElement.mount("#payment-element");

// const submitButton = document.getElementById("submit-payment");

// // Handle payment submission when the button is clicked
// submitButton.addEventListener("click", async function (event) {
//   event.preventDefault();

//   // Confirm the payment when the button is clicked
//   const { paymentIntent, error } = await stripe.confirmPayment({
//     elements: elements,
//     confirmParams: {
//       return_url: "https://yourwebsite.com/success",
//     },
//   });

//   if (error) {
//     // Handle errors
//     console.error("Error:", error.message);
//   } else {
//     // Payment successful, redirect or perform necessary actions
//     console.log("Payment successful:", paymentIntent);
//     // You might redirect the user to a success page here
//   }
// });
