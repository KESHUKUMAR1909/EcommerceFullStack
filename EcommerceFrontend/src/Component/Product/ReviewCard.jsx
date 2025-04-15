import React from 'react';
import ReactStars from 'react-rating-stars-component';
import profilePng from '../../assets/profile.png';

const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: 'rgba(20,20,20,0.1)',
    activeColor: 'tomato',
    size: window.innerWidth < 600 ? 20 : 25,
    value: review?.ratings || 0,
    isHalf: true,
  };

  return (
    <div className="reviewCard">
      <img
        src={profilePng}
        alt={`${review?.name || 'User'}'s profile`}
      />
      <p>{review?.name || 'Anonymous'}</p>
      <ReactStars {...options} />
      <span>{review?.comment || 'No comment provided.'}</span>
    </div>
  );
};

export default ReviewCard;
