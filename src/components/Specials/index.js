import styled from 'styled-components'
import { ReactComponent as SpeakerPhone } from '../../assets/speakerphone.svg'
import Item from './Item'
import _ from 'lodash'

const Main = styled.article`
  padding: 40px;
  background-color: #be433c;
  color: #fff;
`
const Title = styled.h2`
  font-weight: 900;
`
const ListContainer = styled.ul`
  padding: 0px;
  list-style: none;
`

const Specials = ({ items }) => {
  return (
    <Main>
      <SpeakerPhone fill='#fff' width={200} height={200} />
      <Title>Specials!</Title>
      <ListContainer>
        {!_.isEmpty(items) ? (
          items.map((item, index, arr) => (
            <li>
              <Item {...item} isLast={index + 1 === arr.length} />
            </li>
          ))
        ) : (
          <h3>Coming Soon...</h3>
        )}
      </ListContainer>
    </Main>
  )
}

export default Specials
