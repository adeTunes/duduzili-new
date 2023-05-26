import ReturnMedia from "./returnMedia"

function DisplayMedia({ selected, setSelected }) {
    return <div
        style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(90.8px, 1fr))",
        }}
        className="grid gap-[9px]"
    >
        {selected?.map((item, idx) => (
            <ReturnMedia media={item} selected={selected} setSelected={setSelected} key={idx} />
        ))}
    </div>
}

export default DisplayMedia