import React from "react";
import { Container, Row, Navbar } from "react-bootstrap";
import AlbumCards from "./components/albumCards";
import background from "./bandCover.jpg";
import logo from "./rolling-stones-logo-text.png";

const base64 = require("base-64");

const clientID = "94dd3e10abb6481993f35e9698bad543";
const secretID = "b27c5bb650194e12a652c84e3e389e9a";
const encodedID = base64.encode(clientID + ":" + secretID);
const refresh_token =
  "AQDpfCoh0xnZrpPZkHYWT_KxH_047nAcMeJcAZXSpPQA0Ux3CN0FmYrgogs-UO33UMtJrmlTzxQ-SZXHcGtynNAXEf1IF4Y9agC_0Ksb6s9fSA5_CuTYgnFzxQaqGuR_gB4";

const artistID = "22bE4uQ6baNwSHPVcDxLCe";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      access_token: "",
    };
  }

  componentDidMount() {
    this.refreshToken();
    this.getAlbumData();
  }

  getAlbumData() {
    fetch(`https://api.spotify.com/v1/artists/${artistID}/albums`, {
      method: "get",
      headers: new Headers({
        Authorization: `Bearer ${this.state.access_token}`,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw Error();
      })
      .then((result) => this.setAlbums(result.items))
      .catch(() => {
        this.refreshToken();
      });
  }

  refreshToken() {
    let details = {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    };

    let formBody = [];
    for (const property in details) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch("https://accounts.spotify.com/api/token", {
      method: "post",
      headers: new Headers({
        Authorization: `Basic ${encodedID}`,
        "Content-Type": "application/x-www-form-urlencoded",
      }),
      body: formBody,
    })
      .then((res) => res.json())
      .then((res) => this.setState({ access_token: res.access_token }));
  }

  setAlbums(data) {
    if (!data) return;
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
            background: "linear-gradient(rgba(0, 0, 0, 0.9), transparent)",
          }}
        >
          <Navbar.Brand href="#">
            <img src={logo} width="125rem" />
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
