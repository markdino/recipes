import HeroCarousel, { Item } from "./HeroCarousel";
import styled from "styled-components";

const HeroContainer = styled.section`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Hero = ({ featured }) => {
  return (
    <HeroContainer>
      <HeroCarousel>
        {featured.map((item) => (
          <Item {...item} key={item.uuid} />
        ))}
      </HeroCarousel>
    </HeroContainer>
  );
};

export default Hero;
