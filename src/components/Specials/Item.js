import styled from "styled-components";
import { ReactComponent as CalendarCheck } from "../../assets/calendar-check.svg";
import { ReactComponent as Tag } from "../../assets/tag.svg";
import { ReactComponent as SearchLocation } from "../../assets/search-location.svg";
import { ReactComponent as MapMarker } from "../../assets/map-marker.svg";
import { Col, Row } from "reactstrap";

const Main = styled.section`
  color: #fff;
  fill: #fff;
`;
const Content = styled.section`
  padding: 10px 0px;
  border-bottom: ${(props) => (props.underline ? "1px solid #fff" : "none")};
  margin-left: 10px;

  h4 {
    font-weight: bold;
    font-size: 1rem;
  }
  p {
    font-size: 0.9rem;
  }
  code {
    padding: 3px 5px;
    background-color: #fff;
    border-radius: 5px;
    margin-left: 5px;
  }
`;
const Geo = styled.a.attrs((props) => ({
  href: `https://www.google.com/maps/search/${props.coordinates}`,
  target: "_blank",
  rel: "noopener noreferrer",
}))`
  text-decoration: none;
  color: inherit;
  margin-left: 10px;
  font-size: 0.9rem;

  &:hover {
    color: inherit;
    text-decoration: underline;
  }
`;

const Item = ({ title, text, type, geo, code, isLast }) => {
  const Icon =
    type === "event"
      ? CalendarCheck
      : type === "local"
      ? SearchLocation
      : (type === "promocode" || type === "sale") && Tag;
  return (
    <Main as={Row}>
      <Col xs={2} className="py-3">
        <Icon width={50} />
      </Col>
      <Col xs={10}>
        <Content underline={!isLast}>
          <h4>{title}</h4>
          <p>{text}</p>
          {code && (
            <p>
              CODE:<code>{code}</code>
            </p>
          )}
          {geo && (
            <>
              <MapMarker width={12} />
              <Geo coordinates={geo}>See in Google map</Geo>
            </>
          )}
        </Content>
      </Col>
    </Main>
  );
};

export default Item;
