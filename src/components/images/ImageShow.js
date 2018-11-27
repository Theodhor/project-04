import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';



class ImageShow extends React.Component {
  constructor() {
    super();
    this.state = { image: null };

    this.handleLike = this.handleLike.bind(this);
    this.handleDislike = this.handleDislike.bind(this);
  }

  getImage() {
    const token = Auth.getToken();
    axios
      .get(`/api/images/${this.props.match.params.id}`,{
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(res => this.setState({ image: res.data }));
  }

  componentDidMount() {
    this.getImage();
  }

  liker(){
    return  !!this.state.image.likes.find(like => like.liker_id === Auth.getPayload().sub);
  }
  isMyPhoto(){
    return Auth.getPayload().sub === this.state.image.user_id;
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname) this.getImage();
  }

  handleLike(){
    const token = Auth.getToken();
    const like = {liker_id: Auth.getPayload().sub, image_id: this.props.match.params.id };
    axios.post('/api/likes', like, {
      headers: { Authorization: `Bearer ${token}`}
    })
      .then(()=>{
        axios
          .get(`/api/images/${this.props.match.params.id}`,{
            headers: { Authorization: `Bearer ${token}`}
          })
          .then(res => this.setState({ image: res.data }));
      });
  }


  handleDislike(){
    const token = Auth.getToken();
    const like = this.state.image.likes.find(like => like.liker_id === Auth.getPayload().sub);
    axios.delete(`/api/likes/${like.id}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
      .then(()=>{
        axios
          .get(`/api/images/${this.props.match.params.id}`,{
            headers: { Authorization: `Bearer ${token}`}
          })
          .then(res => this.setState({ image: res.data }));
      });
  }


  render() {
    if(!this.state.image) return null;
    return (
      <main className="section">
        <div className="container">
          <div className="card-image">
            <figure className="image">
              <img src={this.state.image.source} alt="nothing" />
            </figure>
          </div>
          {this.liker() && !this.isMyPhoto() && <button className="choice" onClick={this.handleDislike}>
            Dislike
          </button>}
          {!this.liker() && !this.isMyPhoto() && <button className="choice" onClick={this.handleLike}>
            Like
          </button>}
          {this.state.image.likes.length === 1 &&
            <div>{this.state.image.likes.length} Like</div>
          }
          {this.state.image.likes.length > 1 &&
            <div>{this.state.image.likes.length} Likes</div>
          }
        </div>
      </main>
    );
  }
}

export default ImageShow;
