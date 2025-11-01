import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Simple",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <>This handbook is simple. Just simply hit the Get Started to start.</>
    ),
  },
  {
    title: "Searchable",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <>
        Simply hit search button and type anything you want to find. Powered by{" "}
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
    title: "Frontend Oriented",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        I am a frontend developer. I take notes about issues and what I learned
        in a daily basis.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
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
