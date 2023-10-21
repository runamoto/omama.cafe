const load_channel = async (slug) => {
  const res = await fetch("https://api.are.na/v2/channels/" + slug);
  const data = await res.json();
  return data;
};

const Main = () => {
  let [channel, setChannel] = createSignal();

  let block = createMemo(() => {
    if (channel()) {
      return channel().contents.map((b) => {
        if (b.class === "Link") {
          return () => LinkBlock(b.title, b.source.url);
        } else {
          return () => Block(b.content);
        }
      });
    } else {
      return "loading...".split("").map(Letter);
    }
  });

  load_channel("omama-cafe").then((data) => {
    setChannel(data);
  });

  return block;
};

const Block = (b) => {
  let block = b.split("").map(Letter);
  return h(
    "div",
    {
      style: {
        width: "300px",
        height: "300px",
        margin: "50px",
        border: "1px solid black",
        padding: "50px",
        "box-shadow": "0 0 50px 2px rgba(200,0,200,0.3)",
      },
    },
    block
  );
};

const LinkBlock = (title, link) => {
  return h(
    "div",
    {
      style: {
        width: "300px",
        height: "300px",
        margin: "50px",
        border: "1px solid black",
        padding: "50px",
        "box-shadow": "0 0 50px 2px rgba(200,0,200,0.3)",
      },
    },
    title,
    h("br"),
    h("br"),
    h("br"),
    h(
      "a",
      {
        href: link,
        _target: "blank",
        style: {
          all: "unset",
          border: "1px dotted rgb(250,50,20)",
          cursor: "pointer",
          padding: "10px",
          color: "rgb(250, 50, 0)",
        },
      },
      "click mee"
    )
  );
};

const Letter = (l) => {
  let [letter, setLetter] = createSignal(l);
  let [val, setVal] = createSignal(0);
  const style = createMemo(() => {
    return {
      color: `rgb(${val()}, 0, ${val()})`,
      cursor: "grab",
    };
  });
  return h(
    "whaterver",
    {
      style: style,
      oninput: (e) => setLetter(e.target.value),
      onmouseenter: () => {
        setVal((prev) => prev + 40);
      },
    },
    letter
  );
};

render(Main, document.querySelector("#root"));
