import React from 'react';
import {Card,CardContent,Typography} from "@material-ui/core"

export default function InfoBox({ title, newCases, totalCases}) {
    return (
        <Card className="infoBox">
        <CardContent>
            <Typography className="infoBox_title">
                {title}
            </Typography>
            <Typography className="infoBox_newCases">
                +{newCases}
            </Typography>
            <Typography className="infoBox_totalCases">
                {totalCases} Total Cases
            </Typography>
        </CardContent>
        </Card>
    )
}
