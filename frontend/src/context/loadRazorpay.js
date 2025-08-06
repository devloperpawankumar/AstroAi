import axios from "axios";

const loadRazorpay = async (amount, planName) => {
  let rzp = null;

  try {
    const res = await axios.post("http://localhost:5000/api/user/create-order", {
      amount: amount,
    });

    const { order } = res.data;

    if (!order || !order.amount) {
      throw new Error("Invalid Razorpay order data");
    }

    const options = {
      key: "rzp_test_1H03nPAHT8MWLp",
      amount: order.amount,
      currency: "INR",
      name: "Your Company Name",
      description: `Purchase of ${planName}`,
      order_id: order.id,
      handler: function (response) {
        alert("Payment Successful!");
        console.log("Razorpay Payment Response", response);
        document.body.style.overflow = "auto";
      },
      modal: {
        ondismiss: function () {
          document.body.style.overflow = "auto";
        }
      },
      prefill: {
        name: "User Name",
        email: "user@example.com",
      },
      theme: {
        color: "#000",
      },
    };

    document.body.style.overflow = "hidden";

    rzp = new window.Razorpay(options);
    rzp.open();

  } catch (err) {
    console.error("Failed to load Razorpay:", err.message);
    alert("Unable to complete payment. Please try again later.");
  } finally {
    //   if anything fails scroll is restored
    setTimeout(() => {
      document.body.style.overflow = "auto";
    }, 3000); 
  }
};

export default loadRazorpay;
