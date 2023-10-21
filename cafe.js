/*
 
 Welcome to omama cafe!
 This website runs on Are.na's API.

 Let me take you through the code. 

 Also note, I am using a custom build for
 --> Solid JS <-- that I've tried to simplify over time.
 A project this simple probably doesn't need it but
 whatever... It's fun :)

/* ****************************************************
 * ----------------------------------------------------
 This function will load the channel from the API
 and return the data as a JSON object.
 *
 */
const load_channel = async (slug) => {
  const res = await fetch("https://api.are.na/v2/channels/" + slug);
  const data = await res.json();
  return data;
};
/* ------------------------------------------------
 */

// 1
// 2
// 3
// 4
// 5
// 6

/* ****************************************************
 * ----------------------------------------------------
 *
 * This is the main function that will render the
 * website. It will call the api, get the data, and
 * then render the blocks.
 */
const Main = () => {
  /* ------------------------------------------------
   *
   * A place to put the channel when we have it
   *
   */
  let [channel, setChannel] = createSignal();
  /* ------------------------------------------------
   */

  /* ------------------------------------------------
   *
   * This is memo, which means it will run every time
   * the value of channel changes. In our case it only
   * runs twice, first on load, and then again when the
   * channel is set.
   *
   *
   * If we have the channel, then we can render the
   * blocks. Otherwise, we'll just render a loading
   * message.
   *
   */
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
  /* ------------------------------------------------
   */

  load_channel("omama-cafe").then((data) => {
    setChannel(data);
  });

  return block;
};
/*
 * ****************************************************
 * ----------------------------------------------------
 */

// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9

/* ****************************************************
 * ----------------------------------------------------
 *
 * This is the block component. It takes a string
 * and renders it as a block.
 *
 * Now one might ask, why not just use a string?
 * And what is a block even?
 * Let's figure that out.
 *
 */
const Block = (b) => {
  /*
   * ------------------------------------------------
   * A block is a card, or an Are.na block turned
   * into a card.
   *
   * It's a string that is split into an array of
   * letters, and then each letter is turned into
   * a component.
   *
   * But why do we do this?
   * Why not just use a string like a normal person?
   *
   * Let's look at the Letter component to figure that out.
   *
   */
  let block = b.split("").map(Letter);
  /*
   * ------------------------------------------------
   */

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
/*
 * ****************************************************
 * ----------------------------------------------------
 */

/*
 * This is the letter component. It takes a letter
 * and renders it as a letter.
 *
 * I know what you're thinking. HOW IS THIS BETTER?
 *
 * co-pilot wrote this next line and
 * I thought it was funny so I left it in.
 * -- >
 * Well, it's not. But it's fun. And it's a good
 * example of how to use Solid JS.
 *
 * But that's not a reason, the actual reason is
 * so we can have this certain effect when you
 * move your mouse over the letters.
 *
 */
const Letter = (letter) => {
  /* -----------------------------------------------------------
   * This is a place where we track how many times
   * we've scrubbed through the letters. Every time
   * we go over the letter we add 40 to the value.
   *
   */
  let [val, setVal] = createSignal(0);
  /* -----------------------------------------------------------
   */

  /* -----------------------------------------------------------
   * This is a place where we build the style for the letter.
   * It's pretty simple, we just use the value to change the
   * color of the letter.
   */
  const style = createMemo(() => {
    return {
      color: `rgb(${val()}, 0, ${val()})`,
      cursor: "grab",
    };
  });
  /* -----------------------------------------------------------
   *
   */

  /* -----------------------------------------------------------
   *
   * Oh and if I didn't mention this earlier, this is how you
   * Html in the version of Solid I'm using. It's a function
   * That returns a DOM expression. It's pretty cool, or atleast
   * I really like to write html like this.
   *
   */
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
  /* -----------------------------------------------------------
   *
   */
};

/* -----------------------------------------------------------
 *
 * And that's it! We're at the end of the file.
 * We use the render function to put the Main component which
 * contains the Block component which contains the Letter component
 * into the DOM. And this magnificent website is born.
 *
 * I hope you enjoyed this tour of the code :)
 *
 * Stay for a bit, have some coffee, and see you later!
 *
 */
render(Main, document.querySelector("#root"));

/*
....................................................
....................................................
........................./\.........................
..................______/__\_______.................
..................||-------------||.................
..................||             ||.................
..................||    \|||/    ||.................
..................||   [ @-@ ]   ||.................
..................||    ( ' )    ||.......       ...
..................||    _(O)_    ||.......|EXIT |...
..................||   / >=< \   ||.......|==>> |...
..................||__/_|_:_|_\__||.................
..................-----------------.................
....................................................
.................................................... 
Monkey with a bowtie in the museum-->
*/
