import clsx from "clsx";
import React from "react";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  imageSrc: string;
  description: React.ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Simple",
    imageSrc: "/img/feature-simple.svg",
    description: (
      <>
        Clear, practical notes on things I learn and problems I solve. Browse
        the blog and find something useful.
      </>
    ),
  },
  {
    title: "Searchable",
    imageSrc: "/img/feature-searchable.svg",
    description: (
      <>
        Find the note you need with a quick search. Powered by{" "}
        <a
          href="https://www.algolia.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Algolia
        </a>
        .
      </>
    ),
  },
  {
    title: "Engineer Oriented",
    imageSrc: "/img/feature-engineering.svg",
    description: (
      <>
        Lessons from my day-to-day work as a software engineer, covering
        development, debugging, testing, and the tools I use along the way.
      </>
    ),
  },
];

function Feature({ title, imageSrc, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <img className={styles.featureSvg} src={imageSrc} alt="" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): React.ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
