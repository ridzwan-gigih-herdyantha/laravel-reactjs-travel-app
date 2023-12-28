import Cookies from "js-cookie";
import React, { useState, useEffect } from 'react';
import useSWR from 'swr'
function FavoriteButton(props) {


    const user_id = Cookies.get("user_id")
    const token = Cookies.get("token");

    if (!token) {
        return (
            <p className={styles['text_small']}><span>
                <a href="/login">Log in to favorite this post!</a>
            </span></p>);
    }
    return <FindInitialState userId={user_id} recipeId={props.recipeId}/>
}

function FindInitialState(props) {

    let favBool;

    const fetcher = url => fetch(url).then(r => r.json())
    const { data, error } = useSWR(`/api/users/${props.userId}/recipes/${props.recipeId}`, fetcher)
    
    console.log("This user has this recipe favorited?", data)
    if (error) return <div>failed to load</div>
    if (data === undefined) return <div>loading...</div>

    favBool = data;

    return <SetStateAndToggle favBool={favBool} userId={props.userId} recipeId={props.recipeId}/>
}


function SetStateAndToggle(props) {
    const currentlyAFavorite = <FontAwesomeIcon icon={faHeart} />
    const notCurrentlyAFavorite = <FontAwesomeIcon icon={faHeartBroken}/>

    const [favorite, setFavorite] = useState(props.favBool);

    const toggleFavorite = (postId) => {
        setFavorite((favorite) => {
          if (favorite == true) {
            console.log("I clicked unfavorite")
            console.log(props)
            // fetch(`/api/users/${props.userId}/recipes/${recipeId}/remove`, { method: 'POST' })
            // .then(console.log("deleted successfully"));

          }
          if (favorite == false) {
            console.log("I clicked favorite")
        //     fetch(`/api/users/${props.userId}/recipes/${recipeId}/add`, { method: 'POST' })
        //     .then(console.log("added succesfully"));
           }

          return !favorite;
        });
    }

    return (
        <button
            className={styles['favorite-button']}
            onClick={() => toggleFavorite(props.recipeId)}
            key={props.recipeId}>
        { favorite === true ? currentlyAFavorite : notCurrentlyAFavorite} 
        </button>
    );
}

export {FavoriteButton};