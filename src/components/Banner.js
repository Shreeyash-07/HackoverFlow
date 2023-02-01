import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/banner-illustration.png";
import { ArrowRightCircle } from "react-bootstrap-icons";
import "animate.css";
import TrackVisibility from "react-on-screen";
import classes from "./Banner.module.css";
import Countdown from "react-countdown";
import CountDownTimer from "./CountDown/CountDownTimer";
export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [
    "16th March 2023",
    "Compete with the best",
    "Register today on Devfolio",
  ];
  const period = 2000;
  let date = new Date("03-16-2023, 17:00:00");
  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex((prevIndex) => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  {/* <span className="tagline">Welcome to my Portfolio</span> */}
                  <h1 id="main-text" style={{ height: "160px" }}>
                    {`HackOverflow 1.0`}
                    <br />
                    <span
                      className="txt-rotate"
                      dataPeriod="1000"
                      data-rotate='[ "16th March 2023", "Compete with the best", "Register today on Devfolio" ]'
                    >
                      <span className="wrap">{text}</span>
                    </span>
                  </h1>
                  {/* <Countdown
                    date={date + 10000}
                    renderer={({ days, hours, minutes, seconds }) => {
                      return (
                        <>
                          <span className="tagline">Starts In</span>
                          <h1 id={classes.countDown}>
                            <span className={classes.countDown}>{days}d</span>:
                            <span className={classes.countDown}>{hours}h</span>:
                            <span className={classes.countDown}>
                              {minutes}m
                            </span>
                            :
                            <span className={classes.countDown}>
                              {seconds}s
                            </span>
                          </h1>
                        </>
                      );
                    }}
                  /> */}
                  <div className="">
                    <CountDownTimer />
                  </div>
                  <p className="banner-content" style={{ fontSize: "1.5vw" }}>
                    Join us on 17th March 2023 with students from across the
                    nation for 36 hours of creation, innovation, & fun.
                  </p>
                  <button onClick={() => console.log("connect")}>
                    Register
                  </button>
                </div>
              )}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__zoomIn" : ""
                  }
                >
                  <img src={headerImg} alt="Header Img" />
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
