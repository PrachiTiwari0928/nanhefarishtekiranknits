const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const sendAdminPaymentMail = async (order) => {
  try {
    const approveLink = `http://localhost:5000/admin/approve-payment/${order._id}`;
    const rejectLink = `http://localhost:5000/admin/reject-payment/${order._id}`;

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: process.env.ADMIN_MAIL,
      subject: "New QR Payment Received",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color:#ff4f87;">New Payment Received</h2>

          <p><b>Customer Name:</b> ${order.name}</p>
          <p><b>Order ID:</b> ${order._id}</p>
          <p><b>Payment Method:</b> ${order.paymentMethod}</p>
          <p><b>Address:</b> ${order.address}</p>
          <p><b>Pincode:</b> ${order.pincode}</p>
          <p><b>Status:</b> Payment Pending Verification ⏳</p>

          <br/>

          <a href="${approveLink}"
             style="
               display:inline-block;
               padding:12px 20px;
               background:green;
               color:white;
               text-decoration:none;
               border-radius:8px;
               margin-right:10px;
               font-weight:bold;
             ">
             ✅ Approve Payment
          </a>

          <a href="${rejectLink}"
             style="
               display:inline-block;
               padding:12px 20px;
               background:red;
               color:white;
               text-decoration:none;
               border-radius:8px;
               font-weight:bold;
             ">
             ❌ Reject Payment
          </a>

          <br/><br/>
          <p style="color:gray; font-size:14px;">
            Click Approve to confirm order.  
            Click Reject if payment not received.
          </p>
        </div>
      `
    });

    console.log("Admin payment email sent ✅");
  } catch (error) {
    console.log("Mail Error ❌", error);
  }
};

module.exports = sendAdminPaymentMail;