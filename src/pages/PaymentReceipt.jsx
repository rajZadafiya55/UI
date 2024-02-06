import React from "react";
import { Container, Paper, Typography } from "@mui/material";
import QRCode from 'qrcode.react';
import { Link } from "react-router-dom";

const PaymentReceipt = () => {

  const Order = JSON.parse(localStorage.getItem("Order"));
  const date= new Date();

  return (
    <Container maxWidth="sm" className="mt-5">
      <Link  to='/' >Home</Link>
      <Paper className="row" elevation={3} style={{ padding: "16px" }}>
        <Typography variant="h4" className="col-12 mb-3" gutterBottom>
          Payment Receipt
        </Typography>
        <Typography className="col-4" variant="body2" paragraph>
          <h4>Name: {Order.username}</h4>
        </Typography>
        <Typography variant="body2" className="col-4">
          <h4>table_no: {Order.table_no}</h4>
        </Typography>
        <Typography variant="body2" className="col-4">
          <h4>Discount: {Order.discount}</h4>
        </Typography>
        <Typography variant="body2" className="col-6 mb-2">
          <h4>Total Amount: {Order.total_amt}</h4>
        </Typography>
        <Typography variant="body2" className="col-6 mb-2">
          <h4>Date: {date.getDate()}/{date.getMonth()}/{date.getFullYear()}</h4>
        </Typography>
        <Typography variant="body2" className="col-12 mb-2">
          <h4>Quntity: {Order.qty}</h4>
        </Typography>
        <Typography variant="body2" className="col-12">
              <div>
                <QRCode value="This is Chili-Restaurant.                     Thank you for Visiting." />
              </div>
        </Typography>
      </Paper>
    </Container>
  );
};

export default PaymentReceipt;
