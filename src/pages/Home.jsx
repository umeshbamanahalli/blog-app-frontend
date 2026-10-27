import { Col, Container, Nav, Row } from "reactstrap";
import NavBar from "../components/CustomeNavBar";
import Base from "../components/Base";
import NewFeed from "../components/NewFeed";
import { useEffect } from "react";
import CategorySideMenu from "../components/CategorySideMenu";
import HorizontalCategoryList from "../components/HorizontalCategoryList";
const Home = () => {

  useEffect(() => {

  }, [])

  return (

    <Base>
      <Container className="mt-3">
        <Row>
          <Col md={3}>
          {/* <HorizontalCategoryList/> */}
            <CategorySideMenu />
          </Col>
          <Col md={9}>
            <NewFeed />
          </Col>
        </Row>
      </Container>
    </Base>

  )
}

export default Home;
