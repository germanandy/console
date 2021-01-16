import React from "react";
import { observer } from "mobx-react";
import { Tabs } from "antd";
import { PageComponent, PageInitHelper } from "../Page";
import { api } from "../../../state/backendApi";
import { motion } from "framer-motion";
import { animProps } from "../../../utils/animationProps";
import { toJson } from "../../../utils/utils";
import { appGlobal } from "../../../state/appGlobal";
import Card from "../../misc/Card";
import { AdminUsers } from "./Admin.Users";
import { AdminRoles } from "./Admin.Roles";
import { DefaultSkeleton } from "../../../utils/tsxUtils";


@observer
export default class AdminPage extends PageComponent {

    initPage(p: PageInitHelper): void {
        p.title = 'Admin';
        p.addBreadcrumb('Admin', '/admin');

        this.refreshData(false);
        appGlobal.onRefresh = () => this.refreshData(true);

    }

    refreshData(force: boolean) {
        api.refreshAdminInfo(force);
    }

    render() {
        if (!api.adminInfo) return DefaultSkeleton;

        return <motion.div {...animProps} style={{ margin: '0 1rem' }}>
            <Card>
                <Tabs style={{ overflow: 'visible' }} animated={false} >

                    <Tabs.TabPane key="users" tab="Users">
                        <AdminUsers />
                    </Tabs.TabPane>

                    <Tabs.TabPane key="roles" tab="Roles">
                        <AdminRoles />
                    </Tabs.TabPane>

                    {/* <Tabs.TabPane key="bindings" tab="Bindings">
                        <AdminRoleBindings />
                    </Tabs.TabPane> */}

                    <Tabs.TabPane key="debug" tab="Debug">
                        <code><pre>{toJson(api.adminInfo, 4)}</pre></code>
                    </Tabs.TabPane>

                </Tabs>
            </Card>
        </motion.div>

    }
}
