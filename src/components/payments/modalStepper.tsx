import { useState } from "react";
import { Stepper, Button, Group } from "@mantine/core";

export default function ModalStepper({ active, setActive }) {
    return (
        <>
            <Stepper
                active={active}
                onStepClick={setActive}
                breakpoint="sm"
                allowNextStepsSelect={false}
                color="#4534B8"
                classNames={{
                    root: "pb-[30px] border-b border-b-solid border-b-[#F3F3F3]",
                    separatorActive: "h-[5px] rounded-[5px]",
                    separator: "h-[5px] rounded-[5px]",
                }}>
                <Stepper.Step completedIcon={<span>1</span>}></Stepper.Step>
                <Stepper.Step completedIcon={<span>2</span>}></Stepper.Step>
                <Stepper.Step completedIcon={<span>3</span>}></Stepper.Step>
                {/* <Stepper.Completed>
                    Completed, click back button to get to previous step
                </Stepper.Completed> */}
            </Stepper>
        </>
    );
}
