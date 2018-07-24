 
import React, {Component} from 'react';
import ReactDom from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';

import SearchBar from './components/Search_bar';
import VideoList from './components/Video_list';
import VideoDetails from './components/Video_details';

const API_KEY = 'AIzaSyCiy4o7OHd-6ya3Dns09VxAX18nXSrvO7s';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            selectedVideo: null
        };
        this.videoSearch('surfboard');
    }

    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, videos => this.setState({
            videos,
            selectedVideo: videos[0]
        }));
    }
    
    render() {
        const videoSearch = _.debounce(term => {this.videoSearch(term)}, 300);
        return (
            <div>
                <SearchBar onSearchTermChange= {term => videoSearch(term)}/>
                <VideoDetails video={this.state.selectedVideo}/>
                <VideoList videos={this.state.videos} onVideoSelect={selectedVideo => this.setState({selectedVideo})}/>
            </div>
        );
    }
}

ReactDom.render(<App />, document.querySelector('.container'));