const load_channel = async (slug) => {
  const res = await fetch("https://api.are.na/v2/channels/" + slug);
  const data = await res.json();
  return data;
};

const Main = () => {
  let [channel, setChannel] = createSignal();

  let block = createMemo(() => {
    if (channel()) {
      return channel().contents.map((b) => Block(b.content));
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
    block,
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
    letter,
  );
};

render(Main, document.querySelector("#root"));
