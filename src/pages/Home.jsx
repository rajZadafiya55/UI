// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import '../Styles/home.css';
import Carousel from 'react-bootstrap/Carousel';
import { Container, Row, Col, ListGroupItem, ListGroup } from "reactstrap";
import featimg1 from '/photos/service-01.png';
import featimg2 from '/photos/service-02.png';
import featimg3 from '/photos/service-03.png';

import Category from '../components/UI/category/Category';
import { useDispatch, useSelector } from 'react-redux';
import { getItemsData } from '../Redux/Actions/itemAction';
import ItemsCard from '../components/UI/items-card/Items-Card';
import whyImg from "/photos/foood1.gif";   
import whyImg2 from "/photos/foood2.gif";
import { FaRegCheckCircle, FaArrowUp } from 'react-icons/fa';
import ReviewSlider from '../components/UI/Slider/ReviewSlider';
import { useNavigate } from "react-router-dom";

const featureData = [
  {
    title: "Quick Service ",
    imgUrl: featimg1,
    desc: "We provide quick services and instant food delivery at your table.",
  },

  {
    title: "Super Dine In",
    imgUrl: featimg2,
    desc: "We have a good environment with Good background music.",
  },
  {
    title: "Easy to order ",
    imgUrl: featimg3,
    desc: "Just Scan Code, Select food and Make payment.",
  },
];

const Home = () => {
  const [allItems, setAllItems] = useState([]);
  const [myProducts, setmyProducts] = useState([]);
  const [category, setCategory] = useState("ALL");
  const dispatch = useDispatch();
  const items = useSelector(state => state.item.allItemsData);
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    setAllItems(items)
    setmyProducts(items)
  }, [items])

  // get all items data 
  useEffect(() => {
    dispatch(getItemsData())
  }, [])

  // filter category 
  useEffect(() => {
    if (category === "ALL") {
      setAllItems(myProducts);
    }

    if (category === "ITALIAN") {
      const filteredProducts = myProducts.filter(
        (item) => item.category === "Italian"
      );

      setAllItems(filteredProducts);
    }

    if (category === "MEXICAN") {
      const filteredProducts = myProducts.filter(
        (item) => item.category === "Mexican"
      );

      setAllItems(filteredProducts);
    }

    if (category === "CHINESE") {
      const filteredProducts = myProducts.filter(
        (item) => item.category === "Chinese"
      );

      setAllItems(filteredProducts);
    }

    if (category === "SOUTH") {
      const filteredProducts = myProducts.filter(
        (item) => item.category === "South"
      );

      setAllItems(filteredProducts);
    }

    if (category === "PUNJABI") {
      const filteredProducts = myProducts.filter(
        (item) => item.category === "Punjabi"
      );

      setAllItems(filteredProducts);
    }

    if (category === "DRINK") {
      const filteredProducts = myProducts.filter(
        (item) => item.category === "Drink"
      );

      setAllItems(filteredProducts);
    }
    if (category === "COMBOS") {
      const filteredProducts = myProducts.filter(
        (item) => item.category === "Combos"
      );

      setAllItems(filteredProducts);
    }
  }, [category]);


  // scroll effect 
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
  }, []);

  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      <section className='carousel'>
        <Carousel className='sub_car'>
          <Carousel.Item className='image'>
            <img
              height={665}
              className=" w-100 object-fit-cover"
              src="photos/poster1.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h5>Our Restaurant</h5>
              <p className='mb-4'>A Good food can make your tummy and day happy.<br /> So eat healthy and make your Day Healthy with good food.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className='image'>
            <img
              height={665}
              className="d-block w-100 object-fit-cover"
              src="photos/poster2.jpg"
              alt="Second slide"
            />
            <Carousel.Caption >
              <h5>Our Restaurant</h5>
              <p className='mb-4'>A Good food can make your tummy and day happy.<br /> So eat healthy and make your Day Healthy with good food.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className='image'>
            <img
              height={665}
              className="d-block w-100 object-fit-cover"
              src="photos/poster3.jpeg"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h5>Our Restaurant</h5>
              <p className='mb-4'>A Good food can make your tummy and day happy.<br /> So eat healthy and make your Day Healthy with good food.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>

      <div className="mb-4 me-3 btn-scrollTop" style={{ display: isVisible ? 'block' : 'none' }} id="fixbtn" onClick={goTop}>
        <FaArrowUp className='iconfix' />
      </div>
      {/* section features */}
      <section className='features mt-5'>
        <Container>
          <Row>
            <Col lg="12" className="text-center ">
              <h5 className="feature__subtitle mb-4"><span>What we serve</span></h5>
              <h2 className="feature__title">Food is really and truly</h2>
              <h2 className="feature__title">
                the most effective <span>medicine</span>
              </h2>
              <p className="mb-1 mt-4 feature__text">
                The smell of good food, like the sound of lightly flowing water,
                <br />
                is indescribable in its evocation of innocence and delight.
              </p>
            </Col>

            {featureData.map((item, index) => (
              <Col lg="4" md="6" sm="6" key={index} className="mt-5">
                <div className="feature__item text-center px-5 py-3 ">
                  <img
                    src={item.imgUrl}
                    alt="feature-img"
                    className="w-25 mb-3"
                  />
                  <h5 className=" fw-bold mb-3">{item.title}</h5>
                  <p>{item.desc}</p>
                </div>
              </Col>
            ))}

          </Row>
        </Container>
      </section>


      {/* section category  */}
      <section className="pt-0 mt-5">
        <Category />
      </section>

      {/* section image  */}
      <section className='container'>

        <div className="row">
          <div className="card ">
            <div className="card-img immmg-btn" alt="...">
              <div className="card-img-overlay text-content d-flex align-items-center justify-content-between">
                <h2 className="card-title  d-flex align-items-center justify-content-start text-white">Good food choices are good investments.</h2>
                <button 
                className="orderbtn bt px-3 py-2 mb-5 text-nowrap d-flex align-items-center  justify-content-center mt-5" 
                onClick={() => navigate('/foods')}>
                Order Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* section items  */}
      <section className="pt-0 mt-5">
        <Container>
          <Row key='items'>
            <Col lg="12" className="text-center">
              <h2>Food Categories</h2>
            </Col>

            <Col lg="12" className='mt-2'>
              <div
                className="food__category d-flex align-items-center justify-content-center flex-wrap "
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                }}
              >
                <button
                  className={`all__btn  ${category === "ALL" ? "foodBtnActive" : ""
                    } `}
                  onClick={() => setCategory("ALL")}
                >
                  All
                </button>
                <button
                  className={`d-flex align-items-center gap-2 ${category === "ITALIAN" ? "foodBtnActive" : ""
                    } `}
                  onClick={() => setCategory("ITALIAN")}
                >
                  Italian
                </button>

                <button
                  className={`d-flex align-items-center gap-2 ${category === "MEXICAN" ? "foodBtnActive" : ""
                    } `}
                  onClick={() => setCategory("MEXICAN")}
                >
                  Mexican
                </button>

                <button
                  className={`d-flex align-items-center gap-2 ${category === "CHINESE" ? "foodBtnActive" : ""
                    } `}
                  onClick={() => setCategory("CHINESE")}
                >
                  Chinese
                </button>

                <button
                  className={`d-flex align-items-center gap-2 ${category === "SOUTH" ? "foodBtnActive" : ""
                    } `}
                  onClick={() => setCategory("SOUTH")}
                >
                  South Indian
                </button>

                <button
                  className={`d-flex align-items-center gap-2 ${category === "PUNJABI" ? "foodBtnActive" : ""
                    } `}
                  onClick={() => setCategory("PUNJABI")}
                >
                  Panjabi
                </button>

                <button
                  className={`d-flex align-items-center gap-2 ${category === "DRINK" ? "foodBtnActive" : ""
                    } `}
                  onClick={() => setCategory("DRINK")}
                >
                  Drinks
                </button>
                <button
                  className={`d-flex align-items-center gap-2 ${category === "COMBOS" ? "foodBtnActive" : ""
                    } `}
                  onClick={() => setCategory("COMBOS")}
                >
                  Combos
                </button>
              </div>
            </Col>
            {allItems.map((item) => (
              <Col lg="3" md="4" sm="6" xs="12" key={item.id} className="mt-5" >
                <ItemsCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      {/* section why our restaurant  */}
      <section className="why__choose-us mt-5">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <img src={whyImg} alt="why-tasty-treat" className="w-100" />
            </Col>

            <Col lg="6" md="6">
              <div className="why__tasty-treat text-start">
                <h2 className="tasty__treat-title mb-4">
                  Why <span>Spice Factory?</span>
                </h2>
                <p className="tasty__treat-desc">
                  Part of the secret of success is to eat what you like and let
                  the food fight it out insideWe Serve the food at your table
                </p>

                <ListGroup className="mt-4">
                  <ListGroupItem className="border-0 ps-0">
                    <p className=" choose__us-title d-flex align-items-center gap-2 ">
                      <FaRegCheckCircle className='checkicon' /> Fresh and
                      tasty foods
                    </p>
                    <p className="choose__us-desc">
                      Our Customer satisfaction is our first priority so We
                      Provide Delicious and Fresh food  to our customer
                    </p>
                  </ListGroupItem>

                  <ListGroupItem className="border-0 ps-0">
                    <p className="choose__us-title d-flex align-items-center gap-2 ">
                      <FaRegCheckCircle className='checkicon' /> Quality
                      support
                    </p>
                    <p className="choose__us-desc">
                      We provide and use fresh ingredients and Prepare Hygienic
                      food so 100% Good quality ingredients are used
                    </p>
                  </ListGroupItem>

                  <ListGroupItem className="border-0 ps-0">
                    <p className="choose__us-title d-flex align-items-center gap-2 ">
                      <FaRegCheckCircle className='checkicon' />Order from any
                      location
                    </p>
                    <p className="choose__us-desc">
                      We Serve food at your table after ordering the
                      food from our app
                    </p>
                  </ListGroupItem>
                </ListGroup>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* section reviws  */}
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="testimonial ">
                <h5 className="testimonial__subtitle mb-4">Testimonial</h5>
                <h2 className="testimonial__title mb-4">
                  What our <span>customers</span> are saying
                </h2>

                <ReviewSlider />
              </div>
            </Col>

            <Col lg="6" md="6">
              <img src={whyImg2} alt="testimonial-img" className="w-100" />
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default Home