import React from "react";
import { Container, Row, Navbar } from "react-bootstrap";
import AlbumCards from "./components/albumCards";
import background from "./bandCover.jpg";
import logo from "./rolling-stones-logo-text.png";

const artistID = "22bE4uQ6baNwSHPVcDxLCe";
const imUrl =
  "https://en.wikipedia.org/wiki/The_Rolling_Stones#/media/File:The_Rolling_Stones_Summerfest_in_Milwaukee_-_2015.jpg";
const access_token =
  "BQAWabmXs9AybzMWbY3lTIp9ulteCCMZFpu0AYIL4SrCDpQCb2GBL94GVJsTvM8-NZxMVsZb3hrWTKdZtY2Pduhkkl1O2QtojHk56wki8VOHqjcVHENvulb0JwmD5tXJWj2Bt31RwoPgakI3WChezepOW_3A39_UxA";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
    };
  }

  componentDidMount() {
    fetch(`https://api.spotify.com/v1/artists/${artistID}/albums`, {
      method: "get",
      headers: new Headers({
        Authorization: `Bearer ${access_token}`,
      }),
    })
      .then((res) => res.json())
      .then((result) => this.setAlbums(result.items));
  }

  setAlbums(data) {
    const albums = data.map((albumInfo) => {
      const name = albumInfo.name;
      const date = albumInfo.release_date;
      const imgurl = albumInfo.images[0].url;
      return { name, date, imgurl };
    });
    this.setState({ albums });
  }

  render() {
    return (
      <div>
        <Navbar
          sticky="top"
          bg="dark"
          className="justify-content-center"
          style={{
            background: "linear-gradient(rgba(0, 0, 0, 0.5), transparent)",
          }}
        >
          <Navbar.Brand href="#">
            <img src={logo} width="100rem" />
          </Navbar.Brand>
        </Navbar>
        <Container
          className="d-flex flex-wrap justify-content-center"
          fluid
          style={{
            padding: "1rem",
            backgroundImage: `url(${background})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <AlbumCards albums={this.state.albums} />
        </Container>
      </div>
    );
  }
}
