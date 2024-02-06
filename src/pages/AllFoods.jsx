// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItemsData } from '../Redux/Actions/itemAction';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ItemsCard from '../components/UI/items-card/Items-Card';
import '../Styles/AllFoods.css'
import { FaSearch } from "react-icons/fa";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


const AllFoods = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allItems, setAllItems] = useState([]);
  const dispatch = useDispatch();
  const items = useSelector(state => state.item.allItemsData);

  useEffect(() => {
    setAllItems(items)
  }, [items])

  useEffect(() => {
    dispatch(getItemsData())
  }, [])

  // eslint-disable-next-line no-unused-vars
  const searchedProduct = allItems.filter((item) => {
    console.log(item)
    if (searchTerm.value === "") {
      return item;
    }
    if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return item;
    } else {
      return console.log("not found");
    }
  });
  return (
    <div>
      <Container>
        <section>
          <Container>
            <Row>
              <Col lg="6" md="6" sm="6" xs="12">
                <div className='mt-5 '>
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="Seach Items"
                      aria-label="Seach Item"
                      aria-describedby="basic-addon2"
                      className='p-2'
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      
                    />
                    <InputGroup.Text id="basic-addon2"><FaSearch /></InputGroup.Text>
                  </InputGroup>
                </div>
                
              </Col>
              <Col lg="6" md="6" sm="6" xs="12" className="mb-5">
                <div className="sorting__widget text-end"></div>
              </Col>

              {searchedProduct.length > 0 ? (
                searchedProduct.map((item) => (
                  <Col
                    lg="3"
                    md="4"
                    sm="6"
                    xs="12"
                    key={item.id}
                    className="mb-4 mt-5"
                  >
                    <ItemsCard item={item} />
                  </Col>
                ))
              ) : (
                <Col lg="12" className="text-center mt-5">
                  <h3>No items found</h3>
                </Col>
              )}

            </Row>
          </Container>
        </section>
      </Container>

    </div>
  )
}

export default AllFoods