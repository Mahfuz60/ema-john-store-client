import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { clearTheCart, getStoredCart } from "../../utilities/fakedb";
import "./Shipping.css";

const Shipping = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const onSubmit = (data) => {
    const saveCart = getStoredCart();
    data.order = saveCart;

    fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert("Order Processing Successfully");
          reset();
          clearTheCart();
        }
      });
  };
  return (
    <div>
      <form className="shipping-form" onSubmit={handleSubmit(onSubmit)}>
        <input defaultValue={user.displayName} {...register("name")} />

        <input defaultValue={user.email} {...register("email", { required: true })} />
        {errors.email && <span className="error">This field is required</span>}
        <input placeholder="Address" defaultValue="" {...register("address")} />
        <input placeholder="City" defaultValue="" {...register("city")} />
        <input placeholder="phone number" defaultValue="" {...register("phone")} />

        <input type="submit" />
      </form>
    </div>
  );
};

export default Shipping;
