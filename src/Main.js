import styled from "styled-components";
import {useState} from "react";
import {useHistory} from "react-router-dom";
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
    margin-bottom: 30px;
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

const Input = styled.input`
    border-radius: 10px;
    box-shadow: rgba(23, 25, 29, 0.3) 0 2px 20px;
    border: none;
    color: #b7a7a7;
    font-family: inherit;
    font-size: 1rem;
    padding: 1rem;
    margin-bottom: 2rem;
    width: 320px;
    outline:none;
`

const Button = styled.button`
    border-radius: 8px;
  height: 30px;
  width: 175px;
  color: #b7a7a7;
  background-color: white;
  border: none;
  font-weight: bold;
  margin-right: 3px;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
`

function Main(){
    const [myState, setMyState]=useState({
        login:'',
        avatar_url:'',
        html_url:'',
        name:'',
        company:''
    });
    const history = useHistory();
    const onIDChange = async evt => {
        try{
            setMyState({
                ...myState,
                login: evt.target.value
            })
        }catch(e){
            console.log("error");
        }
    }
    const getData = async () => {
        try{
            const response = await axios.get(`https://api.github.com/users/${myState.login}`)
            console.log(response);
            if(response.status===200){
                setMyState({
                    ...myState,
                    avatar_url: response.data.avatar_url,
                    html_url: response.data.html_url,
                    name: response.data.name,
                    company: response.data.company
                });
                console.log(myState);
                window.localStorage.setItem('ID', myState.login);
            }
        }catch(e){
            console.log("error");
        }
    }
    return(
        <div>
            <h1 style={{color:"white"}}>💡 GitHub Finder Service</h1>

            <Card>
                <Profile src={myState.avatar_url}></Profile>
                <h3 style={{color: "#b7a7a7", margin:"20px"}}>{myState.name}</h3>
                <p style={{color: "#b7a7a7", margin:"7px"}}>{myState.company}</p>
                <a href={myState.html_url} style={{color:"#dbcece", margin:"5px"} }>프로필로 이동</a>
            </Card>
            <div>
                <Input type="text" placeholder="Input GitHub ID here" onChange={onIDChange}></Input>
            </div>
            <Button onClick={getData}>Find</Button>
            <Button onClick={()=>history.push('/follower')}>Follow List</Button>
        </div>
    );
}

export default Main;