import React, { useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getProperty } from "../../utils/api";
import { PuffLoader } from "react-spinners";
import { AiFillHeart } from "react-icons/ai";
import "./Property.css";

import { FaShower } from "react-icons/fa";
import { AiTwotoneCar } from "react-icons/ai";
import { MdLocationPin, MdMeetingRoom } from "react-icons/md";
import Map from "../../components/Map/Map";
import { concat } from "lodash";
import { useAuth0 } from "@auth0/auth0-react";
import BookingModal from "../../components/BookingModal/BookingModal";
import useAuthCheck from "../../hooks/useAuthCheck";
import Heart from "../../components/Heart/Heart";

const Property = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];
  const { data, isLoading, isError } = useQuery(["resd", id], () =>
    getProperty(id)
  );
  
  const [modalOpened, setModalOpened] = useState(false);
  const {validateLogin} = useAuthCheck();
  const {user}= useAuth0();


  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <PuffLoader />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error while fetching property details</span>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        {/* like button */}
        <div className="like">
          {/* <AiFillHeart size={24} color="white" /> */}
          <Heart id={id}/>
        </div>

        {/* image */}
        <img src={data?.image} alt="home image" />

        <div className="flexCenter property-details">
          {/* left */}
          <div className="fleColStart left">
            {/* head */}
            <div className="flexStart head">
              <span className="primaryText">{data?.title}</span>
              <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                ₹ {data?.price}
              </span>
            </div>

            {/* facilities */}
            <div className="flexStart facilities">
              {/* bathrooms */}
              <div className="flexStart facilities">
                <FaShower size={20} color="#1F3E72" />
                <span>{data?.facilities?.bathrooms} Bathrooms</span>
              </div>

              {/* parkings */}
              <div className="flexStart facilities">
                <AiTwotoneCar size={20} color="#1F3E72" />
                <span>{data?.facilities?.parkings} Parking</span>
              </div>

              {/* rooms */}
              <div className="flexStart facilities">
                <MdMeetingRoom size={20} color="#1F3E72" />
                <span>{data?.facilities?.bedrooms} Room/s</span>
              </div>
            </div>

            {/* description */}
            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {data?.description}
            </span>

            {/* address */}
            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} />
              <span className="secondaryText">
                {data?.address}
                {data?.city}
                {data?.country}
              </span>
            </div>

            {/* booking button */}
            <button className="button"
            onClick={()=>{
              validateLogin() && setModalOpened(true);
            }}
            
            
            >Book your visit
            </button>

            <BookingModal
            opened={modalOpened}
            setOpened={setModalOpened}
            propertyId = {id}
            email = {user?.email}
            />
          </div>

          {/* right side */}
          <div className="map">
            <Map
              address={data?.address}
              city={data?.city}
              country={data?.country}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Property;
