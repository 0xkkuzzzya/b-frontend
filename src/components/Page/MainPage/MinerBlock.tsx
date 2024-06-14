import styled from "styled-components";
import BuyMoreMiners from '../../../assets/BuyMoreMiners.svg'

const MainMinerContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`

const MyMinerContainer = styled.div`
    width: 90%;
    height: 200px;
    background: #1b1b1b;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
`

const GreyText = styled.a`
    color: #adabac;
    font-size: 13px;
    font-weight: 400;
`

const AmountASIC = styled.a`
    color: #fff;
    font-size: 26px;
    font-weight: 500;
`

const ASICContainer = styled.div`
    width: 85%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 30px;
`

const AmountInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 7px;
`

const BuyMiners = styled.img`
    width: 130px;
    height: 65px;
`

const LineReward = styled.div`
    width: 90%;
    height: 5px;
    border-radius: 50px;
    background: #474747;
    margin-top: 30px;
`

const RewardTime = styled.a`
    color: #fff;
    font-size: 15px;
    font-weight: 400;
    margin-top: 20px;
`


export const MinerBlock = () => {
    return (
        <MainMinerContainer>
            <MyMinerContainer>
                <ASICContainer>
                    <AmountInfo>
                        <GreyText>My Miners</GreyText>
                        <AmountASIC>2 ASIC</AmountASIC>
                        <GreyText>3.222 BYTE per 10 min</GreyText>
                    </AmountInfo>
                    <BuyMiners src={BuyMoreMiners}/>
                </ASICContainer>
                <LineReward />
                <RewardTime>2016 Batteries on balance (2 weeks)</RewardTime>
            </MyMinerContainer>
        </MainMinerContainer>
    )
}