import styled from "styled-components";
import Success from '../../../assets/SuccessWithdraw.gif'
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Contrainer = styled.div`
    width: 85%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ConfirmText = styled.a`
    font-size: 25px;
    font-weight: 500;
    color: #fff;
    text-align: center;
    margin-top: 80px;
`

const SuccessGIF = styled.img`
    width: 230px;
    height: 230px;
    margin-top: 30px;
`

const ReturnButton = styled.button`
    width: 90%;
    height: 45px;
    border-radius: 10px;
    background-color: #3e87f6;
    color: #fff;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
`

const Links = styled(Link)`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    position: fixed;
    bottom: 50px;
`

const FarmContainer = styled.div`
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #3e87f6;
    padding-bottom: 5px;
`

const FarmText = styled.a`
    font-size: 15px;
    font-weight: 500;
    color: #fff;
    text-align: center;
    margin-top: 50px;
`


export const SuccessDeposit = () => {

    const navigate = useNavigate();

    useEffect(() => {
		window.Telegram.WebApp.BackButton.show()
        window.Telegram.WebApp.BackButton.onClick(() => navigate(-1))
	}, [])

    return(
        <Contrainer>
            <ConfirmText>Deposit Sent!</ConfirmText>
            <SuccessGIF src={Success}/>
            <Links to="/">
                <ReturnButton>Return to menu</ReturnButton>
            </Links>
        </Contrainer>
    )
}