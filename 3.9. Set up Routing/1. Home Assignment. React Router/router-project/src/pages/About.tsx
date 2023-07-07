import React, { PureComponent } from 'react';
import './About.css';

export class About extends PureComponent {
  render() {
    return (
      <section className="About w-full min-h-[calc(100vh-60px-184px)] flex items-center justify-center">
        <div className="max-w-[1330px]">
          <p>
            For over 20 years, we at Design HQ have been passionate about
            creating spaces reflecting the individuality of our client.
            Imagination and knowledge are the core values that drive us. We
            strive to push our imagination for a fresh look injected with design
            savvy and an eye for detail in the modern and eclectic styles we
            predominantly design in. We continually expand our knowledge from
            the experience each project gives us and keenly watching and
            learning market innovations. Working together with an emphasis on
            listening, the result is truly a collaboration between Design HQ and
            the client.
          </p>
        </div>
      </section>
    );
  }
}

export default About;
