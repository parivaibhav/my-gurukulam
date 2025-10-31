// app/api/chat/route.js
export async function POST(req) {
  const { message } = await req.json();
  const userMsg = message.toLowerCase();

  const faq = {
    courses: "We offer BCA, BBA, BSc, MSc, MBA, and MCA programs.",
    admission:
      "Admissions open every May. Apply at https://yourcollege.edu/admissions.",
    fees: "Our annual fees range from ₹50,000 to ₹1,20,000 depending on the course.",
    contact: "You can contact us at +91-9876543210 or info@yourcollege.edu.",
    faculty: "Our faculty includes experienced professors from IITs and NITs.",
    hostel: "Yes, we provide hostel facilities for both boys and girls.",
    library: "The library has 20,000+ books and digital resources.",
    placement:
      "We have 95% placement success with companies like Infosys, TCS, and Wipro.",
  };

  let reply =
    "Sorry, I couldn’t find that. Please ask about courses, fees, or admissions.";

  for (const key in faq) {
    if (userMsg.includes(key)) {
      reply = faq[key];
      break;
    }
  }

  return new Response(JSON.stringify({ reply }), {
    headers: { "Content-Type": "application/json" },
  });
}
