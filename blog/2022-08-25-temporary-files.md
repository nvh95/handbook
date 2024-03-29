---
slug: temporary-files-life-span
title: How long files stay in temporary folder
authors: [nvh95]
tags: [os]
---

> How long files stay in temporary folder?

Usually 3 days if a file hasn't been accessed. It depends on OS.

<!-- truncate -->

You can see the implementation by running

```command
cat /etc/periodic/daily/110.clean-tmps
```

```bash
#!/bin/sh
#
# $FreeBSD: src/etc/periodic/daily/110.clean-tmps,v 1.13 2004/02/28 04:58:40 ache Exp $
#
# Perform temporary directory cleaning so that long-lived systems
# don't end up with excessively old files there.
#

# If there is a global system configuration file, suck it in.
#
if [ -r /etc/defaults/periodic.conf ]
then
    . /etc/defaults/periodic.conf
    source_periodic_confs
fi

case "$daily_clean_tmps_enable" in
    [Yy][Ee][Ss])
	if [ -z "$daily_clean_tmps_days" ]
	then
	    echo '$daily_clean_tmps_enable is set but' \
		'$daily_clean_tmps_days is not'
	    rc=2
	else
	    echo ""
	    echo "Removing old temporary files:"

	    set -f noglob
	    args="-atime +$daily_clean_tmps_days -mtime +$daily_clean_tmps_days"
	    args="${args} -ctime +$daily_clean_tmps_days"
	    dargs="-empty -mtime +$daily_clean_tmps_days"
	    dargs="${dargs} ! -name .vfs_rsrc_streams_*"
	    [ -n "$daily_clean_tmps_ignore" ] && {
		args="$args "`echo " ${daily_clean_tmps_ignore% }" |
		    sed 's/[ 	][ 	]*/ ! -name /g'`
		dargs="$dargs "`echo " ${daily_clean_tmps_ignore% }" |
		    sed 's/[ 	][ 	]*/ ! -name /g'`
	    }
	    case "$daily_clean_tmps_verbose" in
		[Yy][Ee][Ss])
		    print=-print;;
		*)
		    print=;;
	    esac

	    rc=$(for dir in $daily_clean_tmps_dirs
		do
		    [ ."${dir#/}" != ."$dir" -a -d $dir ] && cd $dir && {
			find -dx . -fstype local -type f $args -delete $print
			find -dx . -fstype local ! -name . -type d $dargs -delete $print
		    } | sed "s,^\\.,  $dir,"
		done | tee /dev/stderr | wc -l)
	    [ -z "$print" ] && rc=0
	    [ $rc -gt 1 ] && rc=1
	    set -f glob
	fi;;

    *)  rc=0;;
esac

exit $rc
```

You can alter the default value of 3 by updating `daily_clean_tmps_days` in `/etc/defaults/periodic.conf`. (Caution: Proceed at your own risk)

Reference: https://developer.apple.com/forums/thread/71382
