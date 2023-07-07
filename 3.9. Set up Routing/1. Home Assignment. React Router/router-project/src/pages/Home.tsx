import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import './Home.css';
import 'animate.css';
import Footer from '../components/core/Footer';
import catalogs from '../data/catalog.json';
import { NavLink } from 'react-router-dom';

type ParallaxGroupProps = JSX.IntrinsicElements['div'] & {
  base?: React.ReactNode;
  fore?: React.ReactNode;
  back?: React.ReactNode;
  deep?: React.ReactNode;
  layer: 1 | 2 | 3 | 4;
};

function ParallaxGroup(props: ParallaxGroupProps) {
  const { base, fore, back, deep, children, layer = 1, ...attrs } = props;
  return (
    <section
      className={`ParallaxGroup parallax__group`}
      style={{ zIndex: layer }}
      {...attrs}
    >
      {fore && (
        <div className="parallax__layer parallax__layer--fore">{fore}</div>
      )}
      {base && (
        <div className="parallax__layer parallax__layer--base">{base}</div>
      )}
      {back && (
        <div className="parallax__layer parallax__layer--back">{back}</div>
      )}
      {deep && (
        <div className="parallax__layer parallax__layer--base">{deep}</div>
      )}
      {children}
    </section>
  );
}

type ParallaxTitleProps = JSX.IntrinsicElements['div'] & {
  title: string;
  titleColor?: string;
  btnText: string;
  to: string;
};

const animateOnIntersect = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate__slideInLeft');
        animateOnIntersect.unobserve(entry.target);
        return;
      }
    });
  },
  { threshold: 0.3 }
);

function ParallaxTitle(props: ParallaxTitleProps) {
  const { title, to, btnText, titleColor, ...attrs } = props;
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!divRef.current) return;
    animateOnIntersect.observe(divRef.current);
  }, [divRef]);

  return (
    <div
      ref={divRef}
      className="absolute top-[122px] flex w-full h-full flex-col justify-center items-center animate__animated"
      {...attrs}
    >
      <h2 className="home__parallax__h2" style={{ color: titleColor }}>
        {title}
      </h2>
      <NavLink to={to} className="home__parallax__button">
        {btnText}
      </NavLink>
    </div>
  );
}

type ParallaxImgProps = JSX.IntrinsicElements['img'] & {};

function ParallaxImg(props: ParallaxImgProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const imgOnLoad: React.ReactEventHandler<HTMLImageElement> = useCallback(
    e => {
      const el = e.target;
      if (!(el instanceof HTMLImageElement)) return;
      if (divRef.current) divRef.current.classList.remove('img-loader');
      el.classList.add('loaded');
    },
    []
  );
  return (
    <div ref={divRef} className="w-full h-full bg-slate-50">
      <img
        className="w-full h-full lazy-img"
        style={{ transitionDuration: '0.5s' }}
        loading="lazy"
        onLoad={imgOnLoad}
        alt=""
        {...props}
      />
    </div>
  );
}

function Home() {
  return (
    <div className="Home">
      <div className="parallax">
        {catalogs.map((catalog, index) => {
          if ((index + 1) % 2 === 0)
            return (
              <ParallaxGroup
                key={catalog.title}
                layer={1}
                fore={
                  <ParallaxTitle
                    to={catalog.to}
                    title={catalog.title}
                    btnText={catalog.btnText}
                  />
                }
                back={<ParallaxImg src={catalog.src} />}
              />
            );

          return (
            <ParallaxGroup
              layer={4}
              key={catalog.title}
              fore={
                <ParallaxTitle
                  to={catalog.to}
                  title={catalog.title}
                  btnText={catalog.btnText}
                />
              }
              base={<ParallaxImg src={catalog.src} />}
            />
          );
        })}
        <div className="ParallaxGroup parallax__group h-[484px] z-[4] ">
          <div className="parallax__layer parallax__layer--base">
            <div className="w-full h-[300px] bg-slate-100"></div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
