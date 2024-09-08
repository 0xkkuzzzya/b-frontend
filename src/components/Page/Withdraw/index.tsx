import styled from "styled-components";
import Laptop from '../../../assets/laptop.webp'
import BytecoinLogo from '../../../assets/BytecoinLogo.png'
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useMinersInfo } from "../../../store/useProtocol";
import { formatCash } from "../../../utils/utils";

const Container = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`

const PageName = styled.a`
    color: #fff;
    font-size: 25px;
    font-weight: 500;
    margin-top: 30px;
    text-align: center;
`

const WithdrawContainer = styled.div`
    width: 100%;
    height: 100px;
    background: #1b1b1b;
    display: flex;
    align-items: center;
    border-radius: 15px;
`

const Logo = styled.img`
    width: 50px;
    height: 50px;
    margin-left: 30px;
`

const WithdrawNameContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-left: 10px;
    gap: 3px;
`

const WithdrawName = styled.a`
    color: #fff;
    font-size: 20px;
    font-weight: 500;
`

const Amount = styled.a`
    color: #888;
    font-size: 14px;
    font-weight: 500;
`

const Links = styled(Link)`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
`


export const Withdraw = () => {

    const navigate = useNavigate();
    const [ miner_info, setMinerInfo ] = useMinersInfo();

    useEffect(() => {
		window.Telegram.WebApp.BackButton.show()
        window.Telegram.WebApp.BackButton.onClick(() => navigate(-1))
	}, [])

    return (
        <Container>
            <PageName>Choose the asset to <br /> withdraw</PageName>
            <Links to="/withdrawamount/NFT">
                <WithdrawContainer>
                    <Logo src={Laptop} />
                    <WithdrawNameContainer>
                        <WithdrawName>NFT Miner</WithdrawName>
                        <Amount>{miner_info.miners_amount} NFT</Amount>
                    </WithdrawNameContainer>
                </WithdrawContainer>
            </Links>
            <Links to="/withdrawamount/BYTE">
                <WithdrawContainer>
                    <Logo src={BytecoinLogo} />
                    <WithdrawNameContainer>
                        <WithdrawName>Bytecoin</WithdrawName>
                        <Amount>{formatCash(miner_info.bytecoins_amount)} BYTE</Amount>
                    </WithdrawNameContainer>
                </WithdrawContainer>
            </Links>
        </Container>
    )
}