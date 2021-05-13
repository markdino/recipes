import { Col, Row } from "reactstrap";
import styled from "styled-components";
import { ReactComponent as Seedling } from "../../assets/seedling.svg";
import { ReactComponent as Shopping } from "../../assets/shopping-basket.svg";
import { ReactComponent as Shield } from "../../assets/shield-alt.svg";
import { ReactComponent as Trophy } from "../../assets/trophy.svg";

const Main = styled.section`
  padding: 60px 20px;
  margin: 40px 0px;
`;
const Card = styled.article.attrs({
  className: "text-center",
})``;

const Lorem = () => {
  return (
    <Main>
      <Row>
        <h2 className="text-center text-danger mb-5">Lorem Epsum</h2>
        <Col md={5} xs={10} className="mx-auto">
          <Card>
            <div className="mx-auto">
              <Seedling height={150} fill="#be433c" />
            </div>
            <p className="text-secondary">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores
              quibusdam cumque sunt et aperiam itaque vero rem error! Labore,
              minus?
            </p>
          </Card>
        </Col>
        <Col md={5} xs={10} className="mx-auto">
          <Card>
            <div className="mx-auto">
              <Shopping height={150} fill="#be433c" />
            </div>
            <p className="text-secondary">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores
              quibusdam cumque sunt et aperiam itaque vero rem error! Labore,
              minus?
            </p>
          </Card>
        </Col>
        <Col md={5} xs={10} className="mx-auto">
          <Card>
            <div className="mx-auto">
              <Shield height={150} fill="#be433c" />
            </div>
            <p className="text-secondary">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores
              quibusdam cumque sunt et aperiam itaque vero rem error! Labore,
              minus?
            </p>
          </Card>
        </Col>
        <Col md={5} xs={10} className="mx-auto">
          <Card>
            <div className="mx-auto">
              <Trophy height={150} fill="#be433c" />
            </div>
            <p className="text-secondary">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores
              quibusdam cumque sunt et aperiam itaque vero rem error! Labore,
              minus?
            </p>
          </Card>
        </Col>
      </Row>
    </Main>
  );
};

export default Lorem;
