import { UseFormReturnType } from "@mantine/form";
import ReturnMedia from "./returnMedia"

function DisplayMedia({ selected }) {
    return <div
        style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(134.8px, 1fr))",
        }}
        className="grid gap-[9px]"
    >
        {selected?.map((item, idx) => (
            <ReturnMedia media={item} key={idx} />
        ))}
    </div>
}

export default DisplayMedia