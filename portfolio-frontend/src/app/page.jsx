"use client"
import Main from '../components/Main'
import Portfolio from '../components/Portfolio'
import Resume from '../components/Resume'
import Score from '../components/Score';
import Vertex from '../components/VertexAI';
import Copyright from '../components/Copyright';
import Render from '../components/Render';
import Tutorials from '../components/Tutorials';
import Contributor from '../components/Contributor';
import Achievements from '../components/Achievements';
import BlogRedirect from '../components/BlogRedirect';
import Opportunities from '../components/Opportunities';
import MockInterview from '../components/MockInterview';



export default function Home() {
  return (
    <>
      <Render />
      <Main />
      <Portfolio />
      <Vertex/>
      <Resume />
      <Score />
      <MockInterview/>
      <Tutorials />
      <Contributor/>
      {/* <Achievements/>
      <BlogRedirect/> */}
      <Opportunities/>
      <Copyright />
    </>
  )
}
