import styled from "styled-components";
import {useState, useEffect} from "react";
import axios from "axios";

const Card = styled.div`
    background-color: white;
    border-radius: 20px;
    box-shadow: rgba(23, 25, 29, 0.3) 0 2px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    max-width: 800px;
    width:350px;
    height:350px;
    margin: 30px;
`

const Profile = styled.image`
    margin-top:20px;
    border:2px solid #ccbaba;
    border-radius:50%;
    height:180px;
    width:180px;
    background: url(${(props)=>props.src});
    background-size: 180px;
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
`

function Follower(){
    const [data, setData] = useState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        const ID = window.localStorage.getItem("ID");
        try{
            const response = await axios.get(`https://api.github.com/users/${ID}/followers`);
            setData(response.data);
            console.log(response.data);
        }
        catch(e){
            console.log("error");
        }
    }, []);
    return(
        <Wrapper>
            {data?.map((person, i)=>
                <Card>
                    <Profile src={person.avatar_url}></Profile>
                    <h3 style={{color: "#b7a7a7", margin:"20px"}}>{person.login}</h3>
                    <a href={person.html_url} style={{color:"#dbcece", margin:"5px"} }>프로필로 이동</a>
                </Card>
            )}
        </Wrapper>
    );
}

export default Follower;