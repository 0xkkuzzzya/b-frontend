import styled from "styled-components";
import DepositMiner from '../../../assets/Deposit.svg'
import BuyBattery from '../../../assets/BuyEnergy.svg'
import Withdraw from '../../../assets/Withdraw.svg'
import { Link } from "react-router-dom";

const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    background: #222;
    border-radius: 15px;
`

const Logo = styled.img`
    width: 40px;
    height: 40px;
`

const LinkContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const LinkText = styled.a`
    color: #fff;
    font-size: 13px;
    font-weight: 500;
    white-space: nowrap;
`

const Links = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
`

const Imgblock = styled.div`
    width: 100px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`


export const NavigationBlock = () => {
    return (
        <Container>
            <LinkContainer style={{borderRight: '1px solid #111'}}>
                <Links to="/depositminer">
                    <Imgblock>
                        <Logo loading="lazy" src={DepositMiner} />
                        <LinkText>Deposit Miner</LinkText>
                    </Imgblock>
                </Links>
            </LinkContainer>
            <LinkContainer>
                <Links to="/buybattery">
                    <Imgblock>  
                        <Logo loading="lazy" src={BuyBattery} />
                        <LinkText>Buy battery</LinkText>
                    </Imgblock>
                </Links>
            </LinkContainer>
            <LinkContainer style={{borderLeft: '1px solid #111'}}>
                <Links to="/withdraw">
                    <Imgblock>
                         <Logo loading="lazy" src={Withdraw} />
                        <LinkText>Withdraw</LinkText>
                    </Imgblock>
                </Links>
            </LinkContainer>
        </Container>
    )
}