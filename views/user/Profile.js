import React, {useState} from "react";
import {Box, Divider, Grid, Tab, Tabs} from "@material-ui/core";
import ProfileCard from "views/user/components/ProfileCard";
import USER_TABS from "views/user/userTabsLabels";
import TabPanel from "components/TabPanel";

const UserProfile = () => {
    const [tab, setTab] = useState(0);
    return (
        <Box height={'100%'}>
                <Grid container spacing={3}>
                    <Grid xs={12} item>
                        <ProfileCard/>
                    </Grid>
                    <Grid xs={12} item>
                        <Box mt={2}>
                            <Tabs value={tab} onChange={(_, value) => setTab(value)} aria-label="tabs" variant="scrollable"
                                  scrollButtons="auto">
                                {
                                    USER_TABS.map(({label}, key) => (
                                        <Tab label={label} key={`client-tab-label-${key}`}/>
                                    ))
                                }
                            </Tabs>
                            <Divider/>
                        </Box>
                        {
                            USER_TABS.map(({component}, key) => (
                                <TabPanel value={tab} index={key} key={`client-tab-panel-${key}`}>
                                    {component}
                                </TabPanel>
                            ))
                        }
                    </Grid>
                </Grid>
        </Box>
    )
}

export default UserProfile
