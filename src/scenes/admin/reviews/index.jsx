import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Card,
  CardContent,
  Avatar,
  Box,
  useTheme,
} from "@mui/material";
import Header from "component/Header";

const Reviews = () => {
  const theme = useTheme();

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:8081/feedback/all");
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Reviews and Ratings"
        subtitle="check the patient reviews and rating"
      />
      {reviews.map((review) => (
        <Card
          key={review.id}
          style={{
            backgroundColor: theme.palette.background.alt,
            color: "white",
            marginBottom: 16,
          }}
        >
          <CardContent
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", marginRight: 8 }}
            >
              <Avatar
                alt="User Avatar"
                src={`https://www.gravatar.com/avatar/${review.emailHash}?d=identicon`}
              />
              <Typography
                variant="h6"
                style={{ marginLeft: 8 }}
                color={theme.palette.secondary[100]}
              >
                {review.email}
              </Typography>
            </div>
          </CardContent>
          <CardContent
            color={theme.palette.secondary[100]}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              color={theme.palette.secondary[100]}
              style={{ fontSize: "1.5rem", marginLeft: 16 }}
            >
              {review.feedback}
            </Typography>
            <Typography
              color={theme.palette.secondary[100]}
              style={{ fontSize: "1rem" }}
            >
              Rating: {review.rating}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default Reviews;
