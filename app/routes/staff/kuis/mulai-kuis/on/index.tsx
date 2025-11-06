import { Separator } from "~/components/ui/separator";
import type { Route } from "./+types";
import { getAllSoalData, getDokumenDataByIdKuis, hitungBenarJawaban, updateKuisProgress } from "./_service";
import { useState } from "react";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "~/components/ui/field";
import { Button } from "~/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { redirect, useSubmit } from "react-router";
import { FIRST_SEGMENT } from "~/lib/route-config";
import { Progress } from "~/components/ui/progress";

export async function action({ request, params }: Route.ActionArgs) {

    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    const jawabanSet = JSON.parse(data.jawabanSet as string) as Record<string, "a" | "b" | "c" | "d">


    const jumlahBenar = await hitungBenarJawaban(jawabanSet)

    await updateKuisProgress(params.idKuisProgress, {
        jumlahBenar: jumlahBenar,
        jawabanSet: JSON.stringify(jawabanSet),
        isSelesai: true
    })


    return redirect(`/${FIRST_SEGMENT}/kuis/skor`)
}

export async function loader({ request, params }: Route.LoaderArgs) {

    // const soal = await getSoalData(params.idKuisElement)
    const allSoal = await getAllSoalData(params.idKuis)
    const dokumen = await getDokumenDataByIdKuis(params.idKuis)

    return { allSoal, dokumen }
}

export default function UjianPage({ params, loaderData }: Route.ComponentProps) {

    const { allSoal, dokumen } = loaderData
    const [indexSoal, setIndexSoal] = useState(0)
    const currentSoal = allSoal[indexSoal]
    const pilihanParsed = JSON.parse(currentSoal.pilgan!) as Record<"a" | "b" | "c" | "d", string>
    const pilihan = Object.entries(pilihanParsed)

    const [jawabanSet, setJawabanSet] = useState<Record<string, "a" | "b" | "c" | "d">>({})
    const currentJawaban = jawabanSet[currentSoal.idKuisElement]

    const handleClick = () => {
        setIndexSoal(prev => prev + 1)
    }

    const handleClickPrev = () => {
        setIndexSoal(prev => prev - 1)
    }

    const handleAnswer = (jawaban: "a" | "b" | "c" | "d") => {
        setJawabanSet(prev => ({
            ...prev,
            [currentSoal.idKuisElement]: jawaban
        }))
    }

    const submit = useSubmit()
    const handleSubmit = () => {

        submit({
            jawabanSet: JSON.stringify(jawabanSet)
        }, {
            method: "post"
        })
    }

    return (
        <div className="flex flex-1 flex-col gap-4 p-8 pt-2">
            <div className="flex items-center justify-center text-center">
                <div className="space-y-0.5">
                    <h1 className="text-3xl font-semibold tracking-tight">Ujian</h1>
                    <p className="text-muted-foreground">Materi ujian berasal dari [{dokumen?.dokumen.judul}]</p>
                </div>
            </div>
            <Separator />
            <div className="flex-1 ">
                <div className="max-w-5xl mx-auto space-y-4">
                    {/* <pre className="bg-muted p-2 rounded text-sm">
                        {JSON.stringify(jawabanSet, null, 2)}
                    </pre> */}
                    <p className="text-sm text-muted-foreground">Pertanyaan No. {indexSoal + 1} dari {allSoal.length} pertanyaan</p>
                    <Progress value={((indexSoal + 1) / allSoal.length) * 100} />
                    <Card key={indexSoal}>
                        <CardHeader>
                            <CardTitle>{currentSoal.soal}</CardTitle>
                            {/* <CardDescription>Card Description</CardDescription>
                            <CardAction>Card Action</CardAction> */}
                        </CardHeader>
                        <CardContent>
                            <RadioGroup
                                value={currentJawaban}
                                onValueChange={(value) => handleAnswer(value as "a" | "b" | "c" | "d")}>

                                {pilihan.map(([key, value], i) => (
                                    <FieldLabel key={key} htmlFor={key} className="font-normal border rounded cursor-pointer">
                                        <Field orientation="horizontal">
                                            <RadioGroupItem value={key} id={key} />
                                            <FieldContent>
                                                <FieldTitle>
                                                    {key.toUpperCase()}{". "}{value}
                                                </FieldTitle>
                                                {/* <FieldDescription>
                                                    Run GPU workloads on a K8s configured cluster.
                                                </FieldDescription> */}
                                            </FieldContent>
                                        </Field>
                                    </FieldLabel>
                                    // <Field key={key} orientation="horizontal" className="border rounded p-4">
                                    //     <RadioGroupItem value={key} id={key} />
                                    //     <FieldLabel htmlFor={key} className="font-normal ">
                                    //         {key.toUpperCase()}{". "}{value}
                                    //     </FieldLabel>
                                    // </Field>
                                ))}
                            </RadioGroup>
                        </CardContent>
                        {/* <CardFooter>
                            <p>Card Footer</p>
                        </CardFooter> */}
                    </Card>
                    <div className="flex justify-between items-center">
                        <Button
                            variant={"outline"}
                            className="cursor-pointer select-none"
                            onClick={handleClickPrev}
                            disabled={indexSoal === 0}
                        >
                            <ChevronLeftIcon />
                            Sebelumnya
                        </Button>

                        {(indexSoal + 1) === allSoal.length ? (
                            <Button
                                variant={"default"}
                                className="cursor-pointer select-none"
                                // type="submit"
                                onClick={handleSubmit}
                            >
                                Submit Jawaban
                            </Button>
                        ) : (
                            <Button
                                variant={"outline"}
                                className="cursor-pointer select-none"
                                onClick={handleClick}
                            >
                                Selanjutnya
                                <ChevronRightIcon />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}