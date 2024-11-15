"use client";
import Main from '../components/Main';
import Vertex from '../components/VertexAI';
import Copyright from '../components/Copyright';
import Green from '../components/Green';
import Contributor from '../components/Contributor';
import Opportunities from '../components/Opportunities';
import FAQ from '../components/FAQ';
import Tools from '../components/Tools';

export default function Home() {
  return (
    <>
        <Main />
        <Tools/>
        <Vertex />
        <Contributor />
        {/* <Achievements/>
        <BlogRedirect/> */}
        <Opportunities />
        <Green/>
        <FAQ/>
        <Copyright />
    </>
  );
}
