import React from "react";
import founderImg from "../assets/115.jpeg";
const About = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "80px 20px",
        fontFamily: "Poppins, sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff5f9",
        backgroundImage: `
          radial-gradient(#ffd6ec 2px, transparent 2px),
          radial-gradient(#c9f3ff 2px, transparent 2px)
        `,
        backgroundSize: "60px 60px",
        backgroundPosition: "0 0, 30px 30px",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          background: "white",
          padding: "60px 40px",
          borderRadius: "35px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.12)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Founder Photo */}
        <img
          src={founderImg}
          alt="Founder - Kiran Tiwari"
          style={{
            width: "220px",
            height: "220px",
            objectFit: "cover",
            borderRadius: "50%",
            border: "6px solid #ffd6ec",
            boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
            marginBottom: "30px",
          }}
        />

        <h1
          style={{
            fontSize: "42px",
            color: "#d63384",
            marginBottom: "20px",
            fontWeight: "700",
          }}
        >
          🌸 About Us
        </h1>

        <p
          style={{
            fontSize: "19px",
            lineHeight: "1.9",
            color: "#444",
            marginBottom: "20px",
          }}
        >
          <strong>Nanhe Farishte – Kiran Knits</strong> sirf ek brand nahi,
          balki ek maa ke dil ka hissa hai. Iski shuruaat hui ek maa ke
          pyaar se, jo har sardi mein apne nanhe farishte ke liye
          apne haathon se garam sweaters, caps aur socks bunna pasand karti thi.
        </p>

        <p
          style={{
            fontSize: "19px",
            lineHeight: "1.9",
            color: "#555",
            marginBottom: "20px",
          }}
        >
          Har dhage mein mamta ki garmahat hai, har bunai mein dua hai,
          aur har design mein bachchon ki muskurahat chhupi hai.
          Yahan kapde nahi, pyaar buna jaata hai.
        </p>

        <p
          style={{
            fontSize: "19px",
            lineHeight: "1.9",
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Hamara sapna hai ki har chhota bachcha sardi mein bhi
          maa ke pyaar ki tarah garam aur mehfooz mehsoos kare.
        </p>

        <div
          style={{
            marginTop: "15px",
            paddingTop: "20px",
            borderTop: "2px dashed #ffd6ec",
          }}
        >
          <p
            style={{
              fontSize: "18px",
              color: "#d63384",
              fontWeight: "600",
            }}
          >
            Made with ❤️
          </p>

          <p
            style={{
              fontSize: "22px",
              color: "#6f42c1",
              fontWeight: "700",
            }}
          >
            By Kiran Tiwari
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;