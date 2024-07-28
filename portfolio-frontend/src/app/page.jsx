"use client"
import Main from '../components/Main'
import Portfolio from '../components/Portfolio'
import Resume from '../components/Resume'
import Score from '../components/Score';
import Vertex from '../components/VertexAI';
import Copyright from '../components/Copyright';
import Render from '../components/Render';
import Contributor from '../components/Contributor';
import Opportunities from '../components/Opportunities';
import MockInterview from '../components/MockInterview';
import Ai from '../components/Ai';



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
      <Ai/>
      <Contributor/>
      {/* <Achievements/>
      <BlogRedirect/> */}
      <Opportunities/>
      <Copyright />
    </>
  )
}
