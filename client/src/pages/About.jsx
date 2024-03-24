import React from "react";
import Headers from "../components/Headers";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className=" w-full">
      <Headers />
      <div className=" py-10 ">
        <div className=" w-[85%] flex flex-wrap mx-auto">
          <div className=" flex justify-center items-center w-full">
            <h1 className=" text-4xl text-[#154E99] italic font-bold">
              Welcome to My Shop
            </h1>
          </div>
          <div className=" w-full p-10">
            <div className=" flex justify-center items-center flex-col p-10">
              <h1 className=" text-2xl font-bold underline p-1">Our Story</h1>
              <p className=" font-normal w-[80%]">
                It all started with a simple idea: to create a place where
                people could find the products they love, all in one convenient
                location. Founded in 2024, My Shop has grown from a small
                startup to a thriving online marketplace, serving customers all
                around the world.
              </p>
            </div>
            <div className=" flex justify-center items-center flex-col p-10">
              <h1 className=" text-2xl font-bold underline p-1">Our Mission</h1>
              <p className=" font-normal w-[80%]">
                Our mission is to provide you with a seamless shopping
                experience, offering a curated selection of high-quality
                products at affordable prices. We strive to exceed your
                expectations by delivering exceptional customer service and
                fostering a community built on trust and satisfaction.
              </p>
            </div>
            <div className=" flex justify-center items-center flex-col p-10">
              <h1 className=" text-2xl font-bold underline p-1">
                What Sets Us Apart
              </h1>
              <p className=" font-normal w-[80%]">
                At My Shop, we understand that each customer is unique, which is
                why we're dedicated to offering a diverse range of products to
                suit every need and preference. Whether you're searching for the
                latest trends, everyday essentials, or one-of-a-kind treasures,
                you'll find it all right here.
              </p>
            </div>
            <div className=" flex justify-center items-center flex-col p-10">
              <h1 className=" text-2xl font-bold underline p-1">
                Our Commitment to You
              </h1>
              <p className=" font-normal w-[80%]">
                Your satisfaction is our top priority. From the moment you visit
                our website to the day your order arrives at your doorstep,
                we're committed to providing you with a seamless and enjoyable
                shopping experience. Our team is here to assist you every step
                of the way, ensuring that your needs are met and your questions
                are answered promptly.
              </p>
            </div>
            <div className=" flex justify-center items-center flex-col p-10">
              <h1 className=" text-2xl font-bold underline p-1">
                Join Our Community
              </h1>
              <p className=" font-normal w-[80%]">
                We invite you to join our growing community of happy customers
                and discover why My Shop is the ultimate destination for all
                your shopping needs. Connect with us on social media, sign up
                for our newsletter, and be the first to know about exclusive
                offers, promotions, and exciting updates.
              </p>
            </div>

            <div className=" flex justify-center items-center flex-col p-10">
              <p className=" font-normal w-[80%]">
                At My Shop, we're passionate about bringing joy and convenience
                to your shopping experience. We believe that every purchase
                tells a story and should be an enjoyable journey from start to
                finish. Thank you for choosing My Shop. We look forward to
                serving you and making your shopping experience truly
                exceptional. Feel free to customize this content to better
                reflect the unique story and values of your ecommerce website!
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
