import Link from "next/link";
import React from "react";
import Image from "next/image";
import SignInPage from "../signInGoogle/page";

function Hero() {
  return (
    <div className="flex flex-col justify-center items-center my-20">
      <div className="hidden lg:block">
        <Image
          src="/profile1.png"
          width={100}
          height={100}
          className="h-[100px] object-cover rounded-full absolute right-36"
        />
        <Image
          src="/profile3.png"
          width={100}
          height={100}
          className="h-[100px] object-cover rounded-full absolute top-48 left-16"
        />
        <Image
          src="/profile2.png"
          width={100}
          height={100}
          className="h-[100px] object-cover rounded-full absolute bottom-20 left-36"
        />
        <Image
          src="/profile4.png"
          width={100}
          height={100}
          className="h-[100px] object-cover rounded-full absolute right-16 bottom-32"
        />
      </div>
      <div className="text-center max-w-3xl">
        <h2 className="font-bold text-[60px] text-slate-700">
          Your Smart POS Solution
        </h2>
        <h2 className="text-xl mt-5 text-slate-500">
          "Revolutionize Your Business Operations with Our Smart POS System –
          Seamlessly Manage Sales, Track Inventory, and Enhance Customer
          Experiences with Ease and Security."
        </h2>

        <div className="flex gap-4 flex-col mt-5">
          <h3 className="text-sm">Sign Up free with Google and Facebook</h3>
          <div className="flex justify-center gap-8">
            {/* <button className="p-6 flex gap-4">
              <Image src="/google.png" width={30} height={30} alt="google" />
              Sign up with Google
            </button> */}
            <SignInPage />
            <button className="p-6 flex gap-4">
              <Image
                src="/facebook.png"
                width={30}
                height={30}
                alt="facebook"
              />
              Sign up with Facebook
            </button>
          </div>
          <hr></hr>
          <h2>
            <Link href="" className="text-primary">
              <u>
                <b>Sign up with Email. </b>
              </u>{" "}
            </Link>{" "}
            No Credit Card Required.
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Hero;
