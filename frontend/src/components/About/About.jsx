import aboutimg from '../../assets/images/about.png';
import aboutCardimg from '../../assets/images/about-card.png';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    // 1) Add `mb-0 pb-0` to remove default bottom margin/padding
    <section className="mb-0 pb-0">
      <div className="container">
        <div className="flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row ">
          {/* about img */}
          <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
            <img src={aboutimg} alt="" />
            <div className="absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22%] ">
              <img src={aboutCardimg} alt="" />
            </div>
          </div>

          {/* about content */}
          <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
            <div className="heading">Proud to be one of the nations best</div>

            <p className="text__para">
              One Medical was founded on a better model of care one designed
              around patients needs that provides a higher level of quality and
              service affordably. We do this through innovative design, excellent
              customer service, and the efficient use of technology.
            </p>

            {/* 2) Reduce the top margin on the second paragraph (was mt-[30px]) */}
            <p className="textpara mt-[10px]">
              Our best is something we strive for each day, caring for our
              patients—not looking back at what we accomplished but towards what
              we can do tomorrow. Providing the best. Lorem ipsum dolor sit amet
              consectetur adipisicing elit.
            </p>

            <Link to="/">
              {/* 3) Force no bottom margin on the button */}
              <button className="btn mb-0">Learn More</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
