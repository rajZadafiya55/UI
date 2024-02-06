import { Container, Row, Col } from "reactstrap";

import catImg01 from "/photos/menufood1 (1).gif";
import catImg02 from "/photos/menufood1 (2).gif";
import catImg03 from "/photos/menufood1 (3).gif";
import catImg04 from "/photos/menufood1 (4).gif";

import "../../../Styles/category.css";

const categoryData = [
  {
    display: "Fastfood",
    imgUrl: catImg01,
  },
  {
    display: "Pizza",
    imgUrl: catImg02,
  },

  {
    display: "Asian Food",
    imgUrl: catImg03,
  },

  {
    display: "Row Meat",
    imgUrl: catImg04,
  },
];

const Category = () => {
  return (
    <Container>
      <Row>
        {categoryData.map((item, index) => (
          <Col lg="3" md="4" sm="6" xs="6" className="mb-4" key={index}>
            <div className="category__item d-flex align-items-center gap-3">
              <div className="category__img">
                <img src={item.imgUrl} alt="category__item" />
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Category;
