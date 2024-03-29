import React, {useState} from 'react';
import {Col, Input} from 'reactstrap';
import Friend from './Friend';
import Suggestion from './Suggestion';

const Friends = ({conversations, send_request, remove_suggestion, set_conversation, confirm_request, friends_suggestions, search_suggestions, mobileView}) => {
    const [search, setSearch] = useState('');

    const filter_conversations = (search) => {
        if(search.search === '') return conversations;
        return conversations.filter(conversation => conversation.friend.firstName.toLowerCase().includes(search.search.toLowerCase()) 
                                    || conversation.friend.lastName.toLowerCase().includes(search.search.toLowerCase()))
    }
    const getClass = () => {
        if(mobileView === null) {
            return 'border p-0 h-100 d-block';
        } else if (mobileView === 'friends') {
            return 'border p-0 h-100 d-block';
        } else if(mobileView === 'conversation') {
            return 'd-none'
        }
    }

    return(
        <Col md={{size: 3}} xs={{size: 12}} sm={{size: 12}} className={getClass()}>
        <div className="border text-center messenger-title">
            <h4 className="mt-2">Friends</h4>
        </div>
        <Input className="m-1 mx-auto searchFriends" type="search" name="search" id="searchFriends" 
            placeholder="Search in friends" onChange={(e) => setSearch(e.target.value)} />
        <hr />
        <ul className="friendsList overflow-auto">
            { (filter_conversations.length > 0) && filter_conversations({search}).map(conversation => {
                return <Friend conversation={conversation} key={conversation._id} set_conversation={set_conversation} confirm_request={confirm_request} />
            })}
        </ul>
        <hr />
        <Input className="m-1 mx-auto searchFriends" type="search" name="searchSuggestions" 
            id="searchFriendsSuggestions" placeholder="Search for friends" onChange={(e) => search_suggestions(e.target.value)} />
        <hr />
        <ul className="friendsList overflow-auto">
            { friends_suggestions && 
                friends_suggestions.map(user  => {
                return <Suggestion suggestion={user} send_request={send_request} remove_suggestion={remove_suggestion} key={user._id}/>
            })}
        </ul>
    </Col>
    );
}

export default Friends;